import React, { useState } from 'react';
import loreData from '../../data/lore.json';
import LoreHero from './LoreHero';
import ChapterSelector from './ChapterSelector';
import ChapterReader from './ChapterReader';

export default function LoreViewer() {
  const [activeChapterId, setActiveChapterId] = useState(loreData.chapters[0].id);

  const activeChapter = loreData.chapters.find((c) => c.id === activeChapterId) || loreData.chapters[0];

  return (
    <div className="lore-viewer-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <LoreHero title={loreData.overview.title} intro={loreData.overview.intro} />

      {/* Main Layout: Chapter Selector & Chronicle Parchment */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
        <ChapterSelector
          chapters={loreData.chapters}
          activeChapterId={activeChapterId}
          onSelectChapter={setActiveChapterId}
        />

        <ChapterReader activeChapter={activeChapter} />
      </div>
    </div>
  );
}
