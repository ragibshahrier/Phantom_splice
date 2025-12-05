# Phantom Crop - Requirements Document

## Introduction

Phantom Crop is a Chrome extension that removes backgrounds from images using AI. It features a horror-themed biohazard aesthetic with toxic green colors and provides instant background removal with optional AI-generated image analysis.

## Glossary

- **Extension**: Chrome browser extension (Manifest V3)
- **Backend**: Flask Python server with rembg AI model
- **Frontend**: React TypeScript application
- **Portal**: Upload interface for image selection
- **Extraction**: Background removal process using rembg
- **Analysis**: AI-generated description using Google Gemini

## Requirements

### Requirement 1: Image Upload

**User Story:** As a user, I want to upload images through drag-and-drop or click, so that I can quickly process images.

#### Acceptance Criteria

1. WHEN a user drags an image over the portal THEN the system SHALL provide visual feedback
2. WHEN a user drops an image THEN the system SHALL validate the file type
3. WHEN a user clicks the portal THEN the system SHALL open a file picker
4. WHEN an invalid file is selected THEN the system SHALL display an error message
5. WHEN a valid image is selected THEN the system SHALL begin processing

### Requirement 2: Background Removal

**User Story:** As a user, I want backgrounds removed from my images, so that I can use them with transparent backgrounds.

#### Acceptance Criteria

1. WHEN an image is uploaded THEN the system SHALL resize images larger than 800x800px
2. WHEN processing begins THEN the system SHALL display a loading indicator
3. WHEN the backend processes the image THEN the system SHALL remove the background
4. WHEN processing completes THEN the system SHALL display both original and processed images
5. WHEN processing fails THEN the system SHALL display an error and return to upload state

### Requirement 3: Image Display

**User Story:** As a user, I want to see before/after comparison, so that I can verify the results.

#### Acceptance Criteria

1. WHEN processing completes THEN the system SHALL display images side-by-side
2. WHEN images are displayed THEN the system SHALL fit them within 170x140px containers
3. WHEN hovering over original THEN the system SHALL remove grayscale filter
4. WHEN viewing results THEN the system SHALL show green glowing borders
5. WHEN images are too large THEN the system SHALL scale them proportionally

### Requirement 4: Download Functionality

**User Story:** As a user, I want to download processed images, so that I can use them elsewhere.

#### Acceptance Criteria

1. WHEN the download button is clicked THEN the system SHALL save the image as PNG
2. WHEN downloading THEN the system SHALL name the file "phantom_severed.png"
3. WHEN download completes THEN the system SHALL maintain the transparent background
4. WHEN the image has transparency THEN the system SHALL preserve alpha channel
5. WHEN saving THEN the system SHALL use PNG format

### Requirement 5: User Interface Theme

**User Story:** As a user, I want a horror-themed interface, so that the experience is engaging.

#### Acceptance Criteria

1. WHEN the extension loads THEN the system SHALL display toxic green (#00ff41) theme
2. WHEN elements are interactive THEN the system SHALL show green glow effects
3. WHEN animations play THEN the system SHALL show biohazard aesthetic
4. WHEN text is displayed THEN the system SHALL use horror-themed terminology
5. WHEN backgrounds render THEN the system SHALL show dark green/black gradients

