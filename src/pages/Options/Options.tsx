import React from 'react';
import './Options.css';

interface Props {
  title: string;
}

import './Options.css';
import './Options.scss';

const Separator = () => <span className='separator'>|</span>

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-top">
          <div className="titles">
            <h1 onClick={() => {
              chrome.tabs.update({ url: 'chrome://bookmarks/' });
            }}>Bookmarks</h1>
            <Separator />
            <h2 onClick={() => {
              chrome.runtime.openOptionsPage();
            }}>Options</h2>
            <Separator />
            <h1 onClick={() => {
              chrome.tabs.update({ url: 'chrome://restart/' });
            }}>Restart</h1>
          </div>
        </div>
      </header>
      <main className="App-main">
        <section className="OptionsContainer">
          <h2>{title} Page</h2>
        </section>
      </main>
    </div>
  );
};

export default Options;