
import React from 'react';
import { Button } from '@/components/ui/button';
import { mockJobs } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Briefcase, Clock, MapPin, DollarSign, Building, Linkedin } from 'lucide-react';
import { format } from 'date-fns';

const AlumniPortal = () => {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-comsats-blue">Alumni Job Portal</h1>
      <p className="text-center text-gray-600 mb-8">
        Explore job opportunities posted by COMSATS alumni
      </p>
      
      <div className="space-y-6">
        {mockJobs.map((job) => (
          <Card key={job.id} className="job-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.jobTitle}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {job.companyName}
                  </CardDescription>
                </div>
                <Badge 
                  variant={
                    job.workStyle === 'Hybrid' ? 'outline' : 
                    job.workStyle === 'Online' ? 'secondary' : 'default'
                  }
                  className={
                    job.workStyle === 'Hybrid' ? 'border-orange-300 text-orange-700' : 
                    job.workStyle === 'Online' ? 'bg-green-100 text-green-700' : ''
                  }
                >
                  {job.workStyle}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-1 text-gray-700">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{job.officeLocation}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span>{job.package}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{job.workingHours}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <h4 className="font-medium text-sm mb-1">Qualification Required</h4>
                <p className="text-sm text-gray-600">{job.qualification}</p>
              </div>
              
              <div className="text-xs text-gray-500 flex justify-between items-center">
                <span>Posted by {job.postedBy.name}</span>
                <span>{format(job.postedAt, 'MMM d, yyyy')}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => window.open(job.companyWebsite, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Website
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => window.open(job.companyLinkedin, '_blank')}
                >
                  <Linkedin className="h-3 w-3 mr-1" />
                  LinkedIn
                </Button>
              </div>
              <Button
                size="sm"
                className="bg-comsats-blue hover:bg-comsats-blue/90 text-xs"
                onClick={() => window.open(job.applyLink, '_blank')}
              >
                Apply Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlumniPortal;
