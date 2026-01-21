import React from 'react';

const Media: React.FC = () => {
  return (
    <div className="media-upload">
      <p className="text-white/60 mb-8">Upload files to cloud storage</p>

      {/* Upload Zone */}
      <div className="upload-section bg-[var(--color-bg-card)] rounded-xl p-6 mb-8">
        <div className="upload-zone border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-[var(--color-primary)] transition cursor-pointer">
          <div className="text-4xl mb-4">📤</div>
          <p className="text-white/70 mb-2">Drag & drop files here</p>
          <p className="text-white/50 text-sm">or click to browse</p>
          <p className="text-white/40 text-xs mt-4">Supports: Images, Videos, PDF, GLB/GLTF</p>
        </div>
      </div>

      {/* Recent Uploads */}
      <section>
        <h3 className="text-lg font-bold mb-4">Recent Uploads</h3>
        <div className="bg-[var(--color-bg-card)] rounded-xl p-6">
          <p className="text-white/50 text-center py-8">
            No uploads yet. Upload files above to see them here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Media;
