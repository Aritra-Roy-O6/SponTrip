import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, UserPlus, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/FormElements';
import { createTrip, generateTripPlan } from '../../services/api';
import { Trip } from '../../types';

export const NewTrip: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  
  const [tripData, setTripData] = useState<Partial<Trip>>({
    name: '',
    location: '',
    duration: '',
    mood: '',
    people: 1,
    date: new Date().toISOString().split('T')[0],
    plan: '',
    userId: currentUser?.id,
    createdAt: new Date().toISOString()
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: name === 'people' ? parseInt(value) : value
    }));
  };
  
  const handleNext = () => {
    setStep(step + 1);
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };
  
  const generatePlan = async () => {
    if (!tripData.location || !tripData.duration || !tripData.mood || !tripData.people) {
      return;
    }
    
    setGeneratingPlan(true);
    
    try {
      const plan = await generateTripPlan(
        tripData.location,
        tripData.duration,
        tripData.mood,
        tripData.people
      );
      
      setTripData(prev => ({
        ...prev,
        plan
      }));
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setGeneratingPlan(false);
    }
  };
  
  const handleSubmit = async () => {
    if (!tripData.name || !tripData.location || !currentUser?.id) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const newTrip = await createTrip({
        ...tripData,
        userId: currentUser.id
      } as Trip);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const moodOptions = [
    { value: '', label: 'Select a mood' },
    { value: 'adventurous', label: 'Adventurous' },
    { value: 'relaxing', label: 'Relaxing' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'foodie', label: 'Foodie' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'party', label: 'Party' },
    { value: 'nature', label: 'Nature' }
  ];
  
  const durationOptions = [
    { value: '', label: 'Select duration' },
    { value: 'few hours', label: 'Few Hours' },
    { value: '1 day', label: '1 Day' },
    { value: '2 days', label: '2 Days' }
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Plan a New Trip</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-8">
          <StepIndicator currentStep={step} totalSteps={3} />
        </div>
        
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6">Trip Details</h2>
            
            <Input
              label="Trip Name"
              name="name"
              placeholder="Weekend Getaway"
              value={tripData.name}
              onChange={handleChange}
              required
              className="mb-4"
            />
            
            <Input
              label="Location"
              name="location"
              placeholder="Miami Beach, FL"
              value={tripData.location}
              onChange={handleChange}
              required
              className="mb-4"
              leftIcon={<MapPin size={18} />}
            />
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full md:w-1/2">
                <Select
                  label="Duration"
                  name="duration"
                  options={durationOptions}
                  value={tripData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <Input
                  label="Date"
                  name="date"
                  type="date"
                  value={tripData.date}
                  onChange={handleChange}
                  required
                  leftIcon={<Calendar size={18} />}
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="w-full md:w-1/2">
                <Select
                  label="Mood"
                  name="mood"
                  options={moodOptions}
                  value={tripData.mood}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <Input
                  label="Number of People"
                  name="people"
                  type="number"
                  min="1"
                  value={tripData.people}
                  onChange={handleChange}
                  required
                  leftIcon={<UserPlus size={18} />}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                Next Step
              </Button>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6">Generate Trip Plan</h2>
            
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium">{tripData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium">{tripData.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mood</p>
                  <p className="font-medium">{tripData.mood}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">People</p>
                  <p className="font-medium">{tripData.people}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Trip Plan</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<Compass size={16} />}
                  onClick={generatePlan}
                  isLoading={generatingPlan}
                >
                  {generatingPlan ? 'Generating...' : 'Generate Plan'}
                </Button>
              </div>
              
              <Textarea
                name="plan"
                placeholder="Your AI-generated trip plan will appear here..."
                value={tripData.plan}
                onChange={handleChange}
                rows={8}
                className="mb-4 font-mono text-sm"
              />
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This plan is generated based on your preferences. Feel free to edit it or regenerate.
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>
                Next Step
              </Button>
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6">Review & Save</h2>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-4">{tripData.name}</h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-6">
                <div className="flex items-start">
                  <MapPin size={18} className="text-primary-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium">{tripData.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="text-primary-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date & Duration</p>
                    <p className="font-medium">{tripData.date} • {tripData.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Compass size={18} className="text-primary-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mood</p>
                    <p className="font-medium">{tripData.mood}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <UserPlus size={18} className="text-primary-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">People</p>
                    <p className="font-medium">{tripData.people}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Trip Plan</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-md text-sm whitespace-pre-line">
                  {tripData.plan || "No plan generated yet."}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Save Trip
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${index + 1 === currentStep
                  ? 'bg-primary-500 text-white'
                  : index + 1 < currentStep
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}
              `}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full"></div>
        <div 
          className="absolute top-0 left-0 h-1 bg-primary-500 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">Trip Details</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Generate Plan</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Review & Save</span>
      </div>
    </div>
  );
};

export default NewTrip;