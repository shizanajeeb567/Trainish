function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 py-12 space-y-2">
      {Icon && <Icon className="w-10 h-10 text-gray-400 mb-2" />}
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default EmptyState; 
