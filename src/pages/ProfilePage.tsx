
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { User, Upload, FilePlus, Camera, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [profileImg, setProfileImg] = useState<string | undefined>(user?.profilePicture);
  
  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    regNumber: user?.registrationNumber || '',
    batch: user?.batch || '',
    program: user?.degreeProgram || '',
    skills: user?.skills?.join(', ') || '',
    interests: user?.interests?.join(', ') || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // In a real app, save to backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
    setEditing(false);
  };
  
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleCVUpload = () => {
    toast({
      title: "CV Uploaded",
      description: "Your CV has been uploaded successfully."
    });
  };
  
  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto">
          <Avatar className="w-24 h-24 border-4 border-white shadow-md">
            <AvatarImage src={profileImg} />
            <AvatarFallback className="text-2xl">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {editing && (
            <div className="absolute bottom-0 right-0">
              <Label htmlFor="profile-pic" className="cursor-pointer">
                <div className="bg-comsats-blue hover:bg-comsats-blue/90 text-white rounded-full p-2">
                  <Camera className="h-4 w-4" />
                </div>
              </Label>
              <Input
                id="profile-pic"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>
          )}
        </div>
        
        <h1 className="text-xl font-bold mt-3">{user?.name}</h1>
        <p className="text-gray-500 text-sm">{user?.email}</p>
        <p className="text-gray-700 text-sm mt-1">{user?.campus.name}</p>
        
        <div className="mt-4">
          {editing ? (
            <Button 
              onClick={handleSave}
              className="bg-comsats-blue hover:bg-comsats-blue/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      
      {/* Profile Content */}
      <Card className="mb-6">
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {editing ? (
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="text-sm p-2 bg-gray-50 rounded-md">
                      {formData.name || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {editing ? (
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                    />
                  ) : (
                    <div className="text-sm p-2 bg-gray-50 rounded-md">
                      {formData.email}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {editing ? (
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell others about yourself"
                      rows={3}
                    />
                  ) : (
                    <div className="text-sm p-2 bg-gray-50 rounded-md min-h-[3rem]">
                      {formData.bio || 'No bio provided'}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="academic">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  {editing ? (
                    <Input
                      id="regNumber"
                      name="regNumber"
                      value={formData.regNumber}
                      onChange={handleChange}
                      placeholder="e.g. SP21-BCS-123"
                    />
                  ) : (
                    <div className="text-sm p-2 bg-gray-50 rounded-md">
                      {formData.regNumber || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch</Label>
                  {editing ? (
                    <Input
                      id="batch"
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      placeholder="e.g. 2021"
                    />
                  ) : (
                    <div className="text-sm p-2 bg-gray-50 rounded-md">
                      {formData.batch || 'Not provided'}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="program">Degree Program</Label>
                  {editing ? (
                    <Input
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      placeholder="e.g. BS Computer Science"
                    />
                  ) : (
                    <div className="text-sm p-2 bg-gray-50 rounded-md">
                      {formData.program || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="skills">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  {editing ? (
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. Programming, UI/UX Design, Data Analysis"
                      rows={3}
                    />
                  ) : (
                    <div className="text-sm p-2 bg-gray-50 rounded-md min-h-[3rem]">
                      {formData.skills || 'No skills listed'}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests (comma separated)</Label>
                  {editing ? (
                    <Textarea
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="e.g. Web Development, Machine Learning, Graphics Design"
                      rows={3}
                    />
                  ) : (
                    <div className="text-sm p-2 bg-gray-50 rounded-md min-h-[3rem]">
                      {formData.interests || 'No interests listed'}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* CV Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your CV</CardTitle>
          <CardDescription>
            Upload your CV/Resume to share with potential employers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user?.cv ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FilePlus className="h-6 w-6 mr-2 text-comsats-blue" />
                <span>Resume.pdf</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(user.cv, '_blank')}
              >
                View CV
              </Button>
            </div>
          ) : (
            <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-md">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">No CV uploaded</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-comsats-blue hover:bg-comsats-blue/90"
            onClick={handleCVUpload}
          >
            Upload CV
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
