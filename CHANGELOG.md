# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-29

### Other

- chore: improve build process to build changelog and version release correctly (06b0be0)
- chore: test workflow now explains version impact (b407b7f)
- chore: update version script to ignore chores for release (fd8a7a1)
- (e82e8d4)
- chore: update dependabot config to mark commits as chores (122b509)
- chore: update test workflow to validate commit messages (7bfe52f)
- chore: update transitive deps (b59324e)
- chore: fix validate action for commits (35ad34c)
- (31a01eb)
- chore(deps-dev): bump the typescript-eslint group with 2 updates (9c123fa)
- (202e978)
- chore(deps-dev): bump lint-staged in the dev-tools group (adbf01e)
- (360daf9)
- chore(deps-dev): bump the jest group with 2 updates (02daef7)
- (138bf7e)
- breaking: updated svelte to latest version (3.x to 5.x) - although this should have no breaking changes, this is just in case (0f85503)
- (f97ed1f)

### Testing

- test: update coverage to 100% by checking v1 adapter settings (4b52ba9)

## [0.1.1] - 2025-12-21

### Changed

- Update dependencies where possible (28b9f43)
- Update and resolve some actions changes, and pin obsidian (923b51c)
- (af24a64)

### Other

- [skip ci] Update version to v0.1.1 (ef02847)

## [0.1.0] - 2025-12-21

### Added

- Added linting and prettier, including git hooks (5c6a69c)

### Changed

- Refactor note classes to remove duplication (c2da5a6)
- Improve GitHub actions and Jest config (078c718)
- Parameterise tests to simplify library (b0e62ac)
- Update CI workflow and update esbuild (0b80772)
- Switch GitHub Action back to v2, v3 was incorrect (3200664)

### Other

- (46ce564)
- [skip ci] Update version to v0.1.0 (1c0913b)

## [0.0.4] - 2025-08-21

### Fixed

- Stretch timestamp check, since the create time could be delayed by over a second (6a51ea6)
- (fc8470b)

### Other

- [skip ci] Update version to v0.0.4 (950c8a9)

## [0.0.3] - 2025-07-23

### Fixed

- Fix recurrence of getDate() issue when Obsidian is open longer than a single day (cd7d948)
- (37e767f)

### Other

- [skip ci] Update version to v0.0.3 (cddb969)

## [0.0.2] - 2025-07-14

### Changed

- Tidying to generate new version and test NPM publishing (a473a91)

### Other

- [skip ci] Update version to v0.0.2 (cd9a61b)

## [0.0.1] - 2025-07-14

### Added

- Add relevant tests (62b689f)
- Adding README and build scripts, including publication (0b1b947)

### Other

- Initial commit with README and LiCENSE (de5f059)
- Initial version without tests (f94883f)
- Force registry value to be correct for NPM (a9642ea)
