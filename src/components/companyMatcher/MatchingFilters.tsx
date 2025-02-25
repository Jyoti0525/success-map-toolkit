// src/components/companyMatcher/MatchingFilters.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const MatchingFilters = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Refine Your Matches</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-medium">Minimum Match Percentage</h3>
          <div className="px-1">
            <Slider defaultValue={[70]} max={100} step={5} />
            <div className="flex justify-between text-sm text-slate-500 mt-1">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium">Work Location</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="remote" />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hybrid" />
              <Label htmlFor="hybrid">Hybrid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="onsite" />
              <Label htmlFor="onsite">On-site</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium">Company Size</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="startup" />
              <Label htmlFor="startup">Startup (&lt;50 employees)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="midsize" />
              <Label htmlFor="midsize">Mid-size (50-500 employees)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enterprise" />
              <Label htmlFor="enterprise">Enterprise (&gt;500 employees)</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium">Industry</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="tech" />
              <Label htmlFor="tech">Technology</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="finance" />
              <Label htmlFor="finance">Finance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="healthcare" />
              <Label htmlFor="healthcare">Healthcare</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="education" />
              <Label htmlFor="education">Education</Label>
            </div>
          </div>
        </div>
        
        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
};

export default MatchingFilters;