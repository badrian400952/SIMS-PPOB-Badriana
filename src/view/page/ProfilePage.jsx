import ProfilHooks from "@/service/profil";
function ProfilePage() {
  const { data, method } = ProfilHooks();
  return (
    <div className="flex flex-col items-center justify-center w-full  p-4">
      <form
        className="bg-white p-6  w-full max-w-sm"
        onSubmit={method.handleTogels}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={data.image || "https://bit.ly/dan-abramov"}
              alt={data.payload.last_name}
              className="rounded-full w-24 h-24 mb-4 object-cover"
            />
            <label
              htmlFor="file-input"
              className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2 cursor-pointer"
            >
              ✏️
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={method.handleImageChange}
              className="hidden"
            />
          </div>
          <h2 className="text-xl font-semibold mb-4">Kristanto Wibowo</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={data.payload.email}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Depan
            </label>
            <input
              type="text"
              value={data.payload.first_name}
              onChange={(e) =>
                method.setPayload({
                  ...data.payload,
                  first_name: e.target.value,
                })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Belakang
            </label>
            <input
              type="text"
              value={data.payload.last_name}
              onChange={(e) =>
                method.setPayload({
                  ...data.payload,
                  last_name: e.target.value,
                })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
