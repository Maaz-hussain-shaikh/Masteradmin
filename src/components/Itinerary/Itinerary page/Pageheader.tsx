export default function Pageheader() {
    const imgurl_4 = "/images/grid-image/image-01.png"

    return (<>

        {/* Desktop Layout */}
        <div className=" sm:block relative w-full aspect-[2.3/1]">
  <div className="absolute inset-0 grid grid-cols-3 gap-2">

    {/* Left Top Image */}
    <div className="relative col-span-1 row-span-1">
      {imgurl_4 ? (
        <img
          src={imgurl_4}
          alt="Left Top"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg text-gray-400">
          Drop Image Here
        </div>
      )}
    </div>

    {/* Left Bottom Image */}
    <div className="relative col-span-1 row-span-1">
      {imgurl_4 ? (
        <img
          src={imgurl_4}
          alt="Left Bottom"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg text-gray-400">
          Drop Image Here
        </div>
      )}
    </div>

    {/* Right Side Main Image (takes full height of 2 rows) */}
    <div className="relative col-span-2 row-span-2 row-start-1">
      {imgurl_4 ? (
        <img
          src={imgurl_4}
          alt="Main Right"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg text-gray-400">
          Drop Image Here
        </div>
      )}
    </div>
  </div>
</div>

       

    </>)
}