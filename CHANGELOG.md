# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-12-21

### Changed

- Update dependencies where possible (28b9f43)
- Update and resolve some actions changes, and pin obsidian (923b51c)

## [0.1.0] - 2025-12-21

### Added

- Added linting and prettier, including git hooks (5c6a69c)

### Changed

- Refactor note classes to remove duplication (c2da5a6)
- Improve GitHub actions and Jest config (078c718)
- Parameterise tests to simplify library (b0e62ac)
- Update CI workflow and update esbuild (0b80772)
- Switch GitHub Action back to v2, v3 was incorrect (3200664)

## [0.0.4] - 2025-08-21

### Fixed

- Stretch timestamp check, since the create time could be delayed by over a second (6a51ea6)

## [0.0.3] - 2025-07-23

### Fixed

- Fix recurrence of getDate() issue when Obsidian is open longer than a single day (cd7d948)

## [0.0.2] - 2025-07-14

### Changed

- Tidying to generate new version and test NPM publishing (a473a91)

## [0.0.1] - 2025-07-14

### Added

- Initial version without tests (f94883f)
- Add relevant tests (62b689f)
- Adding README and build scripts, including publication (0b1b947)
- Force registry value to be correct for NPM (a9642ea)
