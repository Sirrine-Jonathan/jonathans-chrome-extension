import React from 'react';

export const LinkButton = ({ links, children }) => {
  return (
    <button
      className={`${links.length > 1 ? 'multiLink' : 'singleLink'}`}
      onClick={(e) => {
        links.forEach((link, index) => {
          const isPopup =
            typeof link.windowFeatures === 'string' &&
            link.windowFeatures.includes('popup');
          const targetSelfOnLast =
            !isPopup && !e.metaKey && index === links.length - 1;
          window.open(
            ((url) => {
              return !/^https?:\/\//i.test(url) ? 'http://' + url : url;
            })(link.url),
            (targetSelfOnLast && '_self') || link.target,
            link.windowFeatures
          );
        });
      }}
    >
      {children}
    </button>
  );
};
