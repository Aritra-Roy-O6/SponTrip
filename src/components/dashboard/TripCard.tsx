import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trip } from '../../types';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const navigate = useNavigate();

  const viewTrip = () => {
    navigate(`/trips/${trip.id}`);
  };

  return (
    <Card interactive className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span>{trip.name}</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
            {trip.mood}
          </span>
        </CardTitle>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <MapPin size={16} className="mr-1" />
          <span>{trip.location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span>{trip.date} • {trip.duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users size={16} className="mr-2" />
            <span>{trip.people} {trip.people === 1 ? 'person' : 'people'}</span>
          </div>
          
          {trip.plan && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-1">Trip Plan</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {trip.plan.split('\n')[0]}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={viewTrip}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};