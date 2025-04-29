import React from 'react';
import { Users, MapPin, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import { SocialProfile } from '../types';

interface AudienceProps {
  selectedProfile: SocialProfile;
}

const Audience: React.FC<AudienceProps> = ({ selectedProfile }) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audience Insights</h1>
        <p className="mt-2 text-gray-600">Understand your audience demographics and behavior</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Age Distribution</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>18-24</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>25-34</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>35-44</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>45+</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Top Locations</h3>
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=50" alt="USA" className="w-6 h-6 rounded-full object-cover" />
                <span className="ml-2">United States</span>
              </div>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=50" alt="UK" className="w-6 h-6 rounded-full object-cover" />
                <span className="ml-2">United Kingdom</span>
              </div>
              <span className="font-medium">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=50" alt="Canada" className="w-6 h-6 rounded-full object-cover" />
                <span className="ml-2">Canada</span>
              </div>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="https://images.pexels.com/photos/67566/palm-tree-palm-ocean-summer-67566.jpeg?auto=compress&cs=tinysrgb&w=50" alt="Australia" className="w-6 h-6 rounded-full object-cover" />
                <span className="ml-2">Australia</span>
              </div>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Times</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span>Most Active Day</span>
              <span className="font-medium text-blue-600">Wednesday</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <span>Peak Hours</span>
              <span className="font-medium text-green-600">6PM - 9PM</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
              <span>Avg. Session</span>
              <span className="font-medium text-purple-600">12 minutes</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
              <span>Return Rate</span>
              <span className="font-medium text-orange-600">65%</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Interests">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">Technology</div>
              <div className="text-sm text-gray-500">85% affinity</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">Travel</div>
              <div className="text-sm text-gray-500">75% affinity</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">Food & Dining</div>
              <div className="text-sm text-gray-500">70% affinity</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">Fashion</div>
              <div className="text-sm text-gray-500">65% affinity</div>
            </div>
          </div>
        </Card>

        <Card title="Engagement Patterns">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Comments per Post</div>
                <div className="text-sm text-gray-500">Average engagement</div>
              </div>
              <div className="text-2xl font-semibold text-blue-600">24.5</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Shares per Post</div>
                <div className="text-sm text-gray-500">Viral coefficient</div>
              </div>
              <div className="text-2xl font-semibold text-green-600">12.3</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Save Rate</div>
                <div className="text-sm text-gray-500">Content relevance</div>
              </div>
              <div className="text-2xl font-semibold text-purple-600">8.7%</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Audience;