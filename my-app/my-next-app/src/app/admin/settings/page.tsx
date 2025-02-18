"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">General Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Site Name</label>
            <Input type="text" placeholder="DishDash" className="max-w-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Email</label>
            <Input type="email" placeholder="admin@dishdash.com" className="max-w-md" />
          </div>

          <div className="flex items-center justify-between max-w-md">
            <div>
              <h3 className="font-medium">Maintenance Mode</h3>
              <p className="text-sm text-gray-500">Temporarily disable the site for maintenance</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Email Notifications</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">New User Registration</h3>
              <p className="text-sm text-gray-500">Receive notifications for new user signups</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">New Orders</h3>
              <p className="text-sm text-gray-500">Receive notifications for new orders</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">User Reports</h3>
              <p className="text-sm text-gray-500">Receive notifications for user reports</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Minimum Password Length</label>
            <Input type="number" defaultValue="8" className="max-w-md" />
          </div>

          <div className="flex items-center justify-between max-w-md">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings; 