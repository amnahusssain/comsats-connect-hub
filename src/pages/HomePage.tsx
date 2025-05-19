
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  MessageSquare, 
  Image as ImageIcon, 
  Video,
  Send,
  SmilePlus
} from 'lucide-react';
import { mockPosts } from '@/lib/data';
import { Post } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const HomePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [showComments, setShowComments] = useState<{[key: string]: boolean}>({});
  const [commentText, setCommentText] = useState<{[key: string]: string}>({});
  
  const availableReactions = ['👍', '❤️', '😊', '🎉', '👏'];
  
  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };
  
  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
            hasLiked: !post.hasLiked
          };
        }
        return post;
      })
    );
  };
  
  const handleReaction = (postId: string, reaction: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          // If there was a previous reaction, remove it
          const updatedReactions = { ...post.reactions };
          
          if (post.userReaction) {
            updatedReactions[post.userReaction] = (updatedReactions[post.userReaction] || 1) - 1;
          }
          
          // Add new reaction or toggle if it's the same
          const newUserReaction = post.userReaction === reaction ? null : reaction;
          
          if (newUserReaction) {
            updatedReactions[reaction] = (updatedReactions[reaction] || 0) + 1;
          }
          
          return {
            ...post,
            reactions: updatedReactions,
            userReaction: newUserReaction
          };
        }
        return post;
      })
    );
  };
  
  const handleComment = (postId: string) => {
    if (!commentText[postId] || commentText[postId].trim() === '') return;
    
    const newComment = {
      id: Math.random().toString(),
      content: commentText[postId],
      user: user!,
      createdAt: new Date()
    };
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
    
    setCommentText(prev => ({
      ...prev,
      [postId]: ''
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...filesArray]);
    }
  };
  
  const handleSubmitPost = () => {
    if (newPostContent.trim() === '' && selectedImages.length === 0) {
      toast({
        title: "Empty Post",
        description: "Please add some content to your post.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you'd upload images and create post on server
    const newPost: Post = {
      id: Math.random().toString(),
      user: user!,
      content: newPostContent,
      images: selectedImages.length > 0 ? ['/assets/new-post-placeholder.jpg'] : undefined,
      createdAt: new Date(),
      likes: 0,
      comments: [],
      hasLiked: false,
      reactions: {
        '👍': 0,
        '❤️': 0,
        '😊': 0,
        '🎉': 0,
        '👏': 0
      },
      userReaction: null
    };
    
    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setSelectedImages([]);
    
    toast({
      title: "Post Created",
      description: "Your post has been published successfully!"
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* New Post Form */}
      <div className="post-card p-4 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <Avatar>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="What's on your mind?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="flex-1 min-h-[60px] resize-none"
          />
        </div>
        
        {selectedImages.length > 0 && (
          <div className="mt-2 mb-4">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Selected Images: {selectedImages.length}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedImages.map((file, index) => (
                <div key={index} className="w-16 h-16 relative bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">{file.name.slice(0, 10)}...</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between border-t pt-3 mt-3">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-gray-600 flex items-center gap-1">
              <label htmlFor="image-upload" className="cursor-pointer flex items-center">
                <ImageIcon className="h-4 w-4 mr-1" />
                <span>Photo</span>
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 flex items-center gap-1">
              <Video className="h-4 w-4 mr-1" />
              <span>Video</span>
            </Button>
          </div>
          <Button 
            onClick={handleSubmitPost}
            className="bg-comsats-blue hover:bg-comsats-blue/90"
            size="sm"
          >
            Post
          </Button>
        </div>
      </div>
      
      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.user.profilePicture} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">{post.user.name}</h3>
                  <p className="text-xs text-gray-500">
                    {format(post.createdAt, 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className="text-sm">{post.content}</p>
            </div>
            
            {/* Post Images */}
            {post.images && post.images.length > 0 && (
              <div className={`grid ${post.images.length > 1 ? 'grid-cols-2 gap-0.5' : ''} mb-2`}>
                {post.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt="Post" 
                    className="w-full object-cover max-h-96"
                  />
                ))}
              </div>
            )}
            
            {/* Reactions Display */}
            <div className="px-4 py-2">
              <div className="flex gap-1">
                {Object.entries(post.reactions)
                  .filter(([_, count]) => count > 0)
                  .map(([emoji, count]) => (
                    <div key={emoji} className="text-xs bg-gray-100 rounded-full px-2 py-1 flex items-center">
                      <span className="mr-1">{emoji}</span>
                      <span>{count}</span>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* Post Stats */}
            <div className="px-4 py-2 border-t border-b text-xs text-gray-500 flex justify-between">
              <div>{post.likes} likes</div>
              <div>{post.comments.length} comments</div>
            </div>
            
            {/* Post Actions */}
            <div className="grid grid-cols-3 divide-x">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`rounded-none py-2 text-gray-600 ${post.userReaction ? 'text-blue-500 font-medium' : ''}`}
                  >
                    <SmilePlus className={`h-4 w-4 mr-2`} />
                    {post.userReaction || 'React'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="start">
                  <div className="flex gap-2">
                    {availableReactions.map(emoji => (
                      <button
                        key={emoji}
                        className={`text-xl hover:scale-125 transition-transform p-1 rounded-full ${post.userReaction === emoji ? 'bg-gray-100' : ''}`}
                        onClick={() => handleReaction(post.id, emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="ghost" 
                className={`rounded-none py-2 ${post.hasLiked ? 'text-red-500' : 'text-gray-600'}`}
                onClick={() => handleLike(post.id)}
              >
                <Heart className={`h-4 w-4 mr-2 ${post.hasLiked ? 'fill-current' : ''}`} />
                Like
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-none py-2 text-gray-600"
                onClick={() => toggleComments(post.id)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
            
            {/* Comments Section */}
            {showComments[post.id] && (
              <div className="pt-2 px-4 pb-4 bg-gray-50">
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2 items-start">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={comment.user.profilePicture} />
                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="bg-white p-2 rounded-lg text-sm flex-1">
                        <div className="font-medium text-xs">{comment.user.name}</div>
                        <div>{comment.content}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {format(comment.createdAt, 'MMM d • h:mm a')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-1 items-center">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 text-sm p-2 bg-white border rounded-full"
                      value={commentText[post.id] || ''}
                      onChange={e => 
                        setCommentText(prev => ({
                          ...prev,
                          [post.id]: e.target.value
                        }))
                      }
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          handleComment(post.id);
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => handleComment(post.id)}
                      disabled={!commentText[post.id] || commentText[post.id].trim() === ''}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
