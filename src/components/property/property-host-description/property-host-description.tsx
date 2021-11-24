import {User} from '../../../types/types';
import md5 from 'md5';

type PropertyHostDescriptionProps = {
  descriptions: string[],
  host: User
}

export function PropertyHostDescription({descriptions, host}: PropertyHostDescriptionProps): JSX.Element {
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
          <img className="property__avatar user__avatar" src={host.avatar_url} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="property__user-name">
          {host.name}
        </span>
        {host.is_pro ?
          <span className="property__user-status">
             Pro
          </span> : null}
      </div>
      <div className="property__description">
        {descriptions && descriptions.map( (d, index) => (
          <p key={md5(d)} className="property__text">
            {d}
          </p>) ) }
      </div>
    </div>
  );
}
