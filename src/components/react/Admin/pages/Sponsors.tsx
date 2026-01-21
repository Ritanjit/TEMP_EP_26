import React from 'react';

const Sponsors: React.FC = () => {
  return (
    <div className="sponsors-manager">
      <div className="flex justify-between items-center mb-8">
        <p className="text-white/60">Manage sponsors and partners</p>
        <button className="px-4 py-2 bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] transition">
          + Add Sponsor
        </button>
      </div>

      <div className="sponsors-list bg-[var(--color-bg-card)] rounded-xl p-6">
        {/* TODO: Add SponsorManager React component */}
        <p className="text-white/50 text-center py-8">
          Sponsor management interface will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default Sponsors;
