import FeedHeader from "@/components/FeedHeader";

export default function Feed() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-white">
      <FeedHeader />
      <div className="flex flex-wrap px-[48px] py-[71px] justify-between gap-y-4">
        <div className="bg-[#D9D9D9] w-[360px] h-[718px] rounded-[10px]"></div>
        <div className="bg-[#D9D9D9] w-[654px] h-[1256px] rounded-[10px]"></div>
        <div className="flex flex-col gap-12">
          <div className="bg-[#D9D9D9] w-[256px] h-[330px] rounded-[10px]"></div>
          <div className="bg-[#D9D9D9] w-[256px] h-[330px] rounded-[10px]"></div>
        </div>
      </div>
    </main>
  );
}
