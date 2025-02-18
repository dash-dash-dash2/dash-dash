"use client";

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Ban,
  CheckCircle,
  UserCog
} from 'lucide-react';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBanUser = async (userId, isBanned) => {
    try {
      const endpoint = isBanned ? 'unban' : 'ban';
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/${endpoint}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      toast.success(`User ${isBanned ? 'unbanned' : 'banned'} successfully`);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error updating user ban status:', error);
      toast.error('Failed to update user status');
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      toast.success('User role updated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'ALL' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-danger text-center">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select 
              className="rounded-md border border-input px-3"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="USER">Users</option>
              <option value="ADMIN">Admins</option>
              <option value="RESTAURANT_OWNER">Restaurant Owners</option>
            </select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {user.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-success text-xs">{user.role}</span>
                    {user.banned && (
                      <span className="badge badge-danger text-xs">Banned</span>
                    )}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleBanUser(user.id, user.banned)}
                    className={user.banned ? 'text-success' : 'text-danger'}
                  >
                    {user.banned ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Unban User
                      </>
                    ) : (
                      <>
                        <Ban className="w-4 h-4 mr-2" />
                        Ban User
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    const newRole = user.role === 'USER' ? 'RESTAURANT_OWNER' : 'USER';
                    handleUpdateRole(user.id, newRole);
                  }}>
                    <UserCog className="w-4 h-4 mr-2" />
                    Change Role
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {user.phone || 'Not provided'}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {user.address?.address || 'Not provided'}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Join Date</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Orders</p>
                  <p className="font-medium">{user.orders?.length || 0}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className={`font-medium ${user.banned ? 'text-danger' : 'text-success'}`}>
                    {user.banned ? 'Banned' : 'Active'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users; 