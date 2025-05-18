
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents } from '@/lib/data';
import { Calendar, Clock, MapPin, Link as LinkIcon, Info } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '@/lib/types';

const Societies = () => {
  const onlineEvents = mockEvents.filter(event => event.type === 'Online');
  const physicalEvents = mockEvents.filter(event => event.type === 'Physical');
  
  const EventCard = ({ event }: { event: Event }) => {
    const formatDate = (date: Date) => {
      return format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
    };

    return (
      <Card className="event-card mb-4">
        {event.image && (
          <div className="h-40 w-full overflow-hidden rounded-t-lg -mx-4 -mt-4 mb-4">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader className="p-0 mb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{event.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{event.location}</span>
            </div>
            {event.joiningLink && (
              <div className="flex items-center gap-2 text-gray-700">
                <LinkIcon className="h-4 w-4 text-gray-500" />
                <a 
                  href={event.joiningLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Joining Link
                </a>
              </div>
            )}
          </div>
          
          <div className="pt-2 border-t">
            <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
              <Info className="h-4 w-4 text-gray-500" />
              Event Details
            </h4>
            <p className="text-sm text-gray-600">{event.details}</p>
          </div>
          
          <div className="text-xs text-gray-500 pt-2">
            <span>Organized by {event.organizer}</span>
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-4">
          {event.joiningLink && event.type === 'Online' ? (
            <Button
              className="w-full bg-comsats-blue hover:bg-comsats-blue/90"
              onClick={() => window.open(event.joiningLink, '_blank')}
            >
              Join Event
            </Button>
          ) : (
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => window.open(`https://maps.google.com/?q=${event.location}`, '_blank')}
            >
              View Location
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-comsats-blue">
        Society Events
      </h1>
      
      <Tabs defaultValue="physical">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="physical">Physical Events</TabsTrigger>
          <TabsTrigger value="online">Online Events</TabsTrigger>
        </TabsList>
        <TabsContent value="physical" className="mt-6">
          {physicalEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No physical events currently scheduled
            </div>
          ) : (
            physicalEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </TabsContent>
        <TabsContent value="online" className="mt-6">
          {onlineEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No online events currently scheduled
            </div>
          ) : (
            onlineEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Societies;
