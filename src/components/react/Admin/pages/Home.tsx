import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home-manager">
      <p className="text-white/60 mb-8">Update home page content and media</p>

      {/* Hero Section Settings */}
      <section className="mb-8">
        <h3 className="text-lg font-bold mb-4">Hero Section</h3>
        <div className="bg-[var(--color-bg-card)] rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Artist Image</label>
              <div className="upload-zone border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <p className="text-white/50">Drop image here or click to upload</p>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Euphuism Logo</label>
              <div className="upload-zone border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <p className="text-white/50">Drop logo here or click to upload</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Model Settings */}
      <section className="mb-8">
        <h3 className="text-lg font-bold mb-4">3D Model Settings</h3>
        <div className="bg-[var(--color-bg-card)] rounded-xl p-6">
          <p className="text-white/50 text-center py-4">
            3D model upload and configuration will be implemented here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
