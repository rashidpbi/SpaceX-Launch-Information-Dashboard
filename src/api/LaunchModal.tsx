import { Launch } from '../types';
interface LaunchModalProps {
  launch: Launch;
  onClose: () => void;
}

const LaunchModal = ({ launch, onClose }: LaunchModalProps) => {
  let main_img_src = `${launch.links.mission_patch}`
  let wiki_url = `${launch.links.wikipedia}`
  let yt_url = `${launch.links.video_link}`
  let nasa_src = `${launch.links.presskit}`
  let nasa_img_url = `https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg`
  let wiki_img_url = `https://upload.wikimedia.org/wikipedia/commons/5/5a/Wikipedia%27s_W.svg`
  let yt_img_url = `https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg`
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{launch.mission_name}</h2>
        <img src={main_img_src} alt=''/>
        <p>Rocket: {launch.rocket.rocket_name}</p>
        <a href={wiki_url} title='wiki' target='_blank' rel="noreferrer"><img src={nasa_img_url} style={{height:30,width:30}}alt=''/></a>
        <a href={wiki_url} title='wiki'target='_blank' rel="noreferrer"><img src={wiki_img_url} style={{height:30,width:30}}  alt=''/></a>
        <a href={nasa_src} title='yt' target='_blank' rel="noreferrer"><img src={yt_img_url}  style={{height:30,width:30}} alt=''/></a>
        <p>Status: {launch.launch_success ? 'Success' : launch.upcoming ? 'Upcoming' : 'Failure'}   </p>
        <p>Status: {launch.details} <a href={wiki_url} target='_blank' rel="noreferrer">wikipedia</a>  </p>
        <p>flight number: {launch.flight_number}</p>
        <p>mission name:{launch.mission_name}</p>
        <p>rocket type:{launch.rocket.rocket_type}</p>
        <p>manufacturer:{launch.rocket?.second_stage?.payloads?.[0].manufacturer}</p>
        <p>nationality:{launch.rocket?.second_stage?.payloads?.[0].nationality}</p>
        <p>Launched Date: {new Date(launch.launch_date_utc).toUTCString()}</p>
        <p>payload type:{launch.rocket?.second_stage?.payloads?.[0].payload_type}</p>
        <p>orbit: {launch.rocket?.second_stage?.payloads?.[1]?.orbit || 'Unknown'}</p>
        <p>launch site: {launch.launch_site.site_name}</p>



      </div>
    </div>
  );
};

export default LaunchModal;
