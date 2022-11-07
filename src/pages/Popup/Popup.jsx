import React, { useState, useEffect } from 'react';
import './Popup.scss';

const Popup = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(async () => {
    const tree = await chrome.bookmarks.getTree();
    let newBookmarks = [];

    // merge top level categories into one ("Bookmarks Bar", "Other Bookmarks", "Mobile Bookmarks")
    tree.forEach((category) => {
      category.children.forEach((bookmark) => {
        newBookmarks = newBookmarks.concat(bookmark.children);
      });
    });

    // sort each level by children or not and then alphabetically
    console.log(newBookmarks);
    setBookmarks(newBookmarks);
  }, []);

  const handleSearch = (e) => {
    setTerm(e.target.value);
  };

  const textHasTerm = (text) => {
    return text.toLowerCase().includes(term.trim().toLowerCase());
  };

  const nodeHasTerm = (node) => {
    if (term.trim() === '') return true;
    if (node.children) {
      return node.children.some((childNode) => nodeHasTerm(childNode));
    } else {
      return textHasTerm(node.title);
    }
  };

  const hightlightTerm = (text) => {
    const regex = RegExp(term, 'gi');
    const textCopy = text;
    const arr = [];

    let matchArr;
    while ((matchArr = regex.exec(textCopy)) !== null) {
      const preText = textCopy.slice(0, regex.lastIndex - term.length);
      const remaining = textCopy.slice(regex.lastIndex);
      const matchText = matchArr[0];
      text = remaining;
      arr.push(preText);
      arr.push(<span className="highlight">{matchText}</span>);
    }
    arr.push(text);
    return arr;
  };

  const makeBookmark = (node) => {
    return (
      <div className="bookmark">
        <a href={node.url} target="_blank" rel="noopener noreferrer">
          {term ? hightlightTerm(node.title) : node.title}
        </a>
      </div>
    );
  };

  const makeCategory = (node) => {
    const hasChildCategory = node.children.some((child) => child.children);
    return (
      <div className="category">
        <h3>{node.title}</h3>
        {hasChildCategory ? (
          node.children.map((bookmark) => handleNode(bookmark))
        ) : (
          <div className="leaf">
            {node.children.map((bookmark) => makeBookmark(bookmark))}
          </div>
        )}
      </div>
    );
  };

  const handleNode = (node) => {
    if (!nodeHasTerm(node)) return;
    if (node.children) {
      return makeCategory(node);
    } else {
      return makeBookmark(node);
    }
  };

  const getBookmarksHtml = () => bookmarks.map((node) => handleNode(node));

  return (
    <div id="bookmark-root">
      <input
        type="search"
        placeholder="Search Bookmarks"
        onInput={handleSearch}
        value={term}
      />
      {getBookmarksHtml()}
    </div>
  );
};

export default Popup;
