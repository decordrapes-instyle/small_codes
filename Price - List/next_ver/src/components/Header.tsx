export default function Header() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-4 border-sky-500 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <img
            className="h-24 w-auto mb-3 drop-shadow-lg"
            src="https://res.cloudinary.com/dmiwq3l2s/image/upload/v1764322049/zrsn9atwtn42z5ivn4d8.svg"
            alt="Brand Logo"
          />
          <p className="text-gray-300 text-sm font-medium tracking-wider">Premium Window Treatments & Decor</p>
        </div>
      </div>
    </div>
  );
}
