
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockPapers } from '@/lib/data';
import { Search, FileText, Download, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';

const PastPapers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadDetails, setUploadDetails] = useState({
    courseCode: '',
    courseName: '',
    year: '',
    semester: '',
    file: null as File | null,
  });
  const { toast } = useToast();
  
  const filteredPapers = mockPapers.filter(paper => 
    paper.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadDetails({
        ...uploadDetails,
        file: e.target.files[0]
      });
    }
  };
  
  const handleSubmitPaper = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadDetails.courseCode || !uploadDetails.courseName || !uploadDetails.file) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app you'd upload the file to a server
    toast({
      title: "Paper Submitted",
      description: "Your paper has been submitted for review."
    });
    
    setUploadDetails({
      courseCode: '',
      courseName: '',
      year: '',
      semester: '',
      file: null
    });
    
    setIsDialogOpen(false);
  };
  
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-comsats-blue">Past Papers</h1>
      
      <div className="flex items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by course code or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-2 bg-comsats-blue hover:bg-comsats-blue/90">
              <Plus className="h-4 w-4 mr-1" /> Upload
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Past Paper</DialogTitle>
              <DialogDescription>
                Share past papers with other students. Your submission will be reviewed first.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitPaper}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Input
                      id="courseCode"
                      placeholder="e.g. CSC357"
                      required
                      value={uploadDetails.courseCode}
                      onChange={(e) => setUploadDetails({
                        ...uploadDetails,
                        courseCode: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name *</Label>
                    <Input
                      id="courseName"
                      placeholder="e.g. Business Process Engineering"
                      required
                      value={uploadDetails.courseName}
                      onChange={(e) => setUploadDetails({
                        ...uploadDetails,
                        courseName: e.target.value
                      })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      placeholder="e.g. 2023"
                      value={uploadDetails.year}
                      onChange={(e) => setUploadDetails({
                        ...uploadDetails,
                        year: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input
                      id="semester"
                      placeholder="e.g. Spring"
                      value={uploadDetails.semester}
                      onChange={(e) => setUploadDetails({
                        ...uploadDetails,
                        semester: e.target.value
                      })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File *</Label>
                  <Input
                    id="file"
                    type="file"
                    required
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit for Review</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-3">
        {filteredPapers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No papers match your search
          </div>
        ) : (
          filteredPapers.map((paper) => (
            <div key={paper.id} className="paper-card">
              <div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-comsats-blue" />
                  <div>
                    <h3 className="font-medium text-sm">{paper.courseCode}: {paper.courseName}</h3>
                    <p className="text-xs text-gray-500">{paper.semester} {paper.year}</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={() => window.open(paper.fileUrl, '_blank')}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PastPapers;
