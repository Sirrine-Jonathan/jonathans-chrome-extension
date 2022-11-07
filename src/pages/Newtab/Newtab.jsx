import React from 'react';
import './Newtab.css';
import './Newtab.scss';
import { LinkButton } from './Components/Buttons';

const Newtab = () => {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="App-header-top">
          <div className="titles">
            <div
              class="main-nav-item"
              onClick={() => {
                chrome.tabs.update({ url: 'https://www.jonathansirrine.com' });
              }}
              aria-label="go to jonathan's website"
            >
              Website
            </div>
            <span className="separator">|</span>
            <div
              class="main-nav-item"
              onClick={() => {
                chrome.runtime.openOptionsPage();
              }}
              aria-label="open options"
            >
              Options
            </div>
            <span className="separator">|</span>
            <div
              class="main-nav-item"
              onClick={() => {
                chrome.tabs.update({ url: 'chrome://bookmarks/' });
              }}
              aria-label="open bookmarks"
            >
              Bookmarks
            </div>
          </div>
        </nav>
      </header>
      <div>
        <section className="quick-links">
          <ul>
            <li>
              <a href="https://mail.google.com/mail/u/0/#inbox">Gmail</a>
            </li>
            <li>
              <a href="https://stackoverflow.com/questions/tagged/javascript?sort=Newest&filters=NoAnswers,NoAcceptedAnswer&uqlId=65550">
                Stack Overflow
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Newtab;
