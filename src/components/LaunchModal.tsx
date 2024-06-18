import { Launch } from "../types";
interface LaunchModalProps {
  launch: Launch;
  
}

const LaunchModal = ({ launch }: LaunchModalProps) => {
  let main_img_src = `${launch.links.mission_patch}`;
  let wiki_url = `${launch.links.wikipedia}`;
  let yt_url = `${launch.links.video_link}`;
  let nasa_src = `${launch.links.presskit}`;
  let nasa_img_url = `https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg`;
  let wiki_img_url = `https://upload.wikimedia.org/wikipedia/commons/5/5a/Wikipedia%27s_W.svg`;
  let yt_img_url = `https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg`;
  return (
    <div className="">
      <div className="">
        
        <div className="flex mx-4">
          
          <div>
            <img
              src={main_img_src}
              alt=""
              style={{ height: 150, width: 150 }}
            />
          </div>
          <div className="grid place-content-between ml-4 ">
            <div className="flex">
              <h2>{launch.mission_name}</h2>
              <div className="ml-2">
               
                {launch.launch_success
                  ? <div className="flex text-green-900 bg-green-100  rounded-3xl w-20 h-6 items-center  justify-center font-semibold">
                  Success 
                </div>
                  : launch.upcoming
                  ? <div className="flex text-amber-800 bg-yellow-100 rounded-3xl w-28 h-6 items-center  justify-center font-semibold">
                  upcoming
                </div>
                  : <div className=" flex text-rose-800 bg-rose-200 rounded-3xl w-16 h-6 items-center  justify-center font-semibold">
                  failure
                </div>}
              </div>
            </div>
            <div>Rocket: {launch.rocket.rocket_name}</div>
            <div className="flex space-between" >
              <a href={nasa_src} title="wiki" target="_blank" rel="noreferrer" >
                <img src={nasa_img_url} style={{ height: 30, width: 30 }} alt="" />
              </a>
              <a href={wiki_url} title="wiki" target="_blank" rel="noreferrer" className="mx-1">
                <img src={wiki_img_url} style={{ height: 30, width: 30 }} alt="" />
              </a>
              <a href={yt_url} title="yt" target="_blank" rel="noreferrer" className="mx-1">
                <img src={yt_img_url} style={{ height: 30, width: 30 }} alt="" />
              </a>
            </div>
            
          </div>
        </div>

        <div className="m-4 p-4">
          <div >
            {launch.details}
            <a href={wiki_url} target="_blank" rel="noreferrer">
              <span className="text-blue-800">{" "}Wikipedia</span>
            </a>
          </div>
          <div className="my-4 divide-y divide-solid">
            <div className="py-2">flight number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{launch.flight_number}</div>
            <div className="py-2">mission name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{launch.mission_name}</div>
            <div className="py-2">rocket type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{launch.rocket.rocket_type}</div>
            <div className="py-2">
              manufacturer:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{launch.rocket?.second_stage?.payloads?.[0].manufacturer}
            </div>
            <div className="py-2">
              nationality:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{launch.rocket?.second_stage?.payloads?.[0].nationality}
            </div>
            <div className="py-2">Launched Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new Date(launch.launch_date_utc).toUTCString()}</div>
            <div className="py-2">
              payload type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{launch.rocket?.second_stage?.payloads?.[0].payload_type}
            </div>
            <div className="py-2">
              orbit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {launch.rocket?.second_stage?.payloads?.[1]?.orbit || "Unknown"}
            </div>
            <div className="py-2">launch site:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {launch.launch_site.site_name}</div>
                  </div>
          </div>
        </div>
    </div>
  );
};

export default LaunchModal;
