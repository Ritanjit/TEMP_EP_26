import React from 'react';

const Events: React.FC = () => {
  return (
    <div className="events-manager">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-white/60">Manage all fest events</p>
        <button className="px-4 py-2 bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] transition">
          + Add Event
        </button>
      </div>

      {/* Events Table/List */}
      <div className="events-list bg-[var(--color-bg-card)] rounded-xl p-6">
        <p className="text-white/50 text-center py-8">
          Event management interface will be implemented here.
          <br />
          <span className="text-sm">This will be a React Island with forms and tables.</span>
        </p>
      </div>
    </div>
  );
};

export default Events;
