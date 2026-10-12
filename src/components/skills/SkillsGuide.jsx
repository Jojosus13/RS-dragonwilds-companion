import React from 'react';
import skillsData from '../../data/skills.json';
import SkillsHero from './SkillsHero';
import SkillsSection from './SkillsSection';
import FacilitiesSection from './FacilitiesSection';
import RegionsSection from './RegionsSection';

export default function SkillsGuide() {
  const { skills, facilities, regions } = skillsData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Intro Hero */}
      <SkillsHero />

      {/* 1. SKILLS SECTION */}
      <SkillsSection skills={skills} />

      {/* 2. FACILITIES and WORKSTATIONS */}
      <FacilitiesSection facilities={facilities} />

      {/* 3. REGIONS OF ASHENFALL */}
      <RegionsSection regions={regions} />
    </div>
  );
}
