import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import { format, subDays } from "date-fns"  // This is correctly placed here
import axios from "axios"
import type { RestaurantOrder } from "@/types"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export const calculateTotalRevenue = (orders: RestaurantOrder[]) => {
  return orders.reduce((sum, order) => sum + order.totalAmount, 0)
}

export const Analytics = () => {
  const [orders, setOrders] = useState<RestaurantOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7") // days

  useEffect(() => {
    fetchOrders()
  }, [timeRange])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/restaurant-owner/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrders(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate analytics data
  const calculateAnalytics = () => {
    const daysAgo = parseInt(timeRange)
    const filteredOrders = orders.filter(
      (order) => new Date(order.createdAt) > subDays(new Date(), daysAgo),
    )

    // Popular items
    const itemCount: { [key: string]: number } = {}
    filteredOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        itemCount[item.menu.name] = (itemCount[item.menu.name] || 0) + item.quantity
      })
    })

    // Daily revenue
    const dailyRevenue: { [key: string]: number } = {}
    filteredOrders.forEach((order) => {
      const date = format(new Date(order.createdAt), "MM/dd")
      dailyRevenue[date] = (dailyRevenue[date] || 0) + order.totalAmount
    })

    // Average order value
    const averageOrderValue =
      filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0) / filteredOrders.length || 0

    return {
      popularItems: itemCount,
      dailyRevenue,
      averageOrderValue,
      totalOrders: filteredOrders.length,
    }
  }

  const analytics = calculateAnalytics()

  // Prepare chart data
  const revenueChartData = {
    labels: Object.keys(analytics.dailyRevenue),
    datasets: [
      {
        label: "Daily Revenue",
        data: Object.values(analytics.dailyRevenue),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const popularItemsChartData = {
    labels: Object.keys(analytics.popularItems).slice(0, 5), // Top 5 items
    datasets: [
      {
        data: Object.values(analytics.popularItems).slice(0, 5),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  }

  if (loading) return <div>Loading analytics...</div>

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded p-2"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
          <p className="text-3xl font-bold">${analytics.averageOrderValue.toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{analytics.totalOrders}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Revenue</h3>
          <Bar
            data={revenueChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
              },
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
          <Pie
            data={popularItemsChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
              },
            }}
          />
        </Card>
      </div>
    </div>
  )
}