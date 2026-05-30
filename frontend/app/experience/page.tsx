"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experienceData = [
  {
    id: 1,
    role: "Software Engineer",
    company: "AvePoint (Client: GIC)",
    location: "Singapore",
    date: "Jul 2024 - Present",
    description: [
      "Engineered an automated ingestion system ('FeedProc') using Python and SQL to seamlessly process and integrate BlackRock Solutions (BRS) financial factor files into the NeoXam Datahub platform.",
      "Developed full-stack data management features, including a bulk Excel upload engine and an intuitive UI dashboard to streamline user data operations.",
      "Architected automated data validation and alerting frameworks to intercept data discrepancies during runtime, guaranteeing 100% data integrity for downstream systems.",
      "Optimized ingestion pipelines handling large-scale market data from global providers including Bloomberg, Refinitiv, and ICE."
    ]
  },
  {
    id: 2,
    role: "Test Development & Automation Engineer",
    company: "Helius Technologies (Client: NCS)",
    location: "Singapore",
    date: "Nov 2022 - Jun 2024",
    description: [
      "Designed and built an enterprise API Automation Test Framework using JavaScript and Newman for the IRIN3 P3 financial module, fully integrated into Azure DevOps CI/CD pipelines.",
      "Developed system-level utility scripts (PowerShell) to synthetically generate mock bank mainframe files, reducing integration testing cycle times significantly.",
      "Automated internal engineering workflows by leveraging Microsoft Azure APIs to auto-collect system evidence, removing manual overhead."
    ]
  },
  {
    id: 3,
    role: "QA Automation Engineer",
    company: "SeaMoney",
    location: "Singapore",
    date: "May 2021 - Sep 2022",
    description: [
      "Programmed core payment API automation frameworks utilizing Golang and Python to validate high-throughput transactional systems.",
      "Contributed to frontend feature development using React.js and TypeScript for internal engineering interfaces.",
      "Managed continuous integration workflows, environment deployments, and version control using Jenkins, Git, and Linux environments."
    ]
  }
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-[#e6edf5] py-20 px-6 sm:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Professional Experience
          </h1>
          <p className="text-[#8aa6df] text-lg">
            Engineering robust systems, automated pipelines, and intelligent architectures.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experienceData.map((job, index) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 border-l border-[rgba(255,255,255,0.08)] md:border-none pl-6 md:pl-0">
                
                {/* Left Column: Date & Location (Desktop) */}
                <div className="hidden md:block md:col-span-1 pt-1">
                  <div className="flex items-center text-sm text-[#8aa6df] mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {job.date}
                  </div>
                  <div className="flex items-center text-sm text-[#8aa6df]">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                </div>

                {/* Right Column: Content Card */}
                <div className="md:col-span-3 bg-[#0f1624] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(35,208,255,0.3)] transition-colors duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative">
                  
                  {/* Timeline Node indicator (Mobile) */}
                  <div className="md:hidden absolute -left-[35px] top-8 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(35,208,255,0.5)] border-2 border-[#090b10]" />
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-cyan-400" />
                      {job.role}
                    </h3>
                    <h4 className="text-lg text-cyan-200 mt-1">{job.company}</h4>
                    
                    {/* Date & Location (Mobile only) */}
                    <div className="flex flex-wrap gap-4 mt-3 md:hidden text-sm text-[#8aa6df]">
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {job.date}</span>
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mt-6">
                    {job.description.map((bullet, idx) => (
                      <li key={idx} className="flex items-start text-[0.95rem] leading-relaxed text-[rgba(255,255,255,0.82)]">
                        <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}