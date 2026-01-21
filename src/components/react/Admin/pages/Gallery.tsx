
const Gallery: React.FC = () => {
  return (
    <div className="media-gallery">
      <div className="flex justify-between items-center mb-8">
        <p className="text-white/60">All uploaded media files</p>
        <div className="flex gap-4">
          <select className="bg-[var(--color-bg-card)] border border-white/10 rounded-lg px-4 py-2">
            <option>All Types</option>
            <option>Images</option>
            <option>Videos</option>
            <option>3D Models</option>
          </select>
          <a href="/admin/media" className="px-4 py-2 bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] transition">
            Upload New
          </a>
        </div>
      </div>

      {/* Media Grid */}
      <div className="media-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Placeholder for media items */}
        <div className="col-span-full bg-[var(--color-bg-card)] rounded-xl p-12 text-center">
          <p className="text-white/50">
            Media files will be displayed here in a grid layout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
