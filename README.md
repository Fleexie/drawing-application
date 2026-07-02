# React Canvas Drawing Application

An interactive drawing application built with React, TypeScript and the Canvas API.

The project explores how to build a drawing interface with multiple tools, shared state, custom controls and a responsive UI. It was created as a personal project to work with browser-based graphics, user interaction and frontend architecture beyond typical CRUD interfaces.

## Demo

Live demo: https://drawing-application-two.vercel.app/

## Tech stack

- React
- TypeScript
- Redux Toolkit
- SCSS
- Canvas API
- Vite
- Custom hooks

## Features

- Freehand drawing on canvas
- Adjustable brush settings
- Color selection
- Tool panels for drawing controls
- Shared application state with Redux Toolkit
- Component-based UI structure

## What this project demonstrates

This project demonstrates practical frontend work with:

- Canvas rendering and pointer interaction
- State management for drawing tools and UI controls
- Structuring a small interactive application in React
- Separating UI controls from drawing logic
- Handling a more interaction-heavy interface than a standard form-based app

## Challenges and learnings

The biggest challenge was connecting React state with the imperative nature of the Canvas API. Canvas drawing requires direct manipulation, while React works declaratively, so the project required a careful split between UI state and drawing behavior.

I also gained experience with structuring drawing tools, managing user input and keeping the UI understandable as more controls were added.

## Future improvements

This project is still a work in progress. If I were to continue developing it, I would focus on:

- Refactoring drawing tools into a more modular structure
- Improving naming and file organization
- Adding undo/redo
- Improving mobile and touch support
- Adding automated tests for UI behavior
- Improving accessibility of the tool controls
- Adding export/download functionality

## Running locally

```bash
npm install
npm run dev
