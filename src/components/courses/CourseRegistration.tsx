"use client";

import { useState } from "react";
import RegistrationModal from "@/components/RegistrationModal";
import type { Course } from "@/app/course/[slug]/types";

interface CourseRegistrationProps {
  course: Course;
}

export default function CourseRegistration({ course }: CourseRegistrationProps) {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setIsRegistrationModalOpen(true)}
        className="bg-french-red hover:bg-french-red/90 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-french-red/30"
      >
        Enroll Now
      </button>
      
      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        course={course}
      />
    </>
  );
}
