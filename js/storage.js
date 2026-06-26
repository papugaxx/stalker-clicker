import { gameState, prices } from './state.js';
import { ARTIFACT_CONFIG } from './config.js';

const SAVE_KEY = 'stalkerSave_v6';
const LEGACY_SAVE_KEY = 'stalkerSave_v5';

export function saveGame() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
        state: gameState,
        prices,
    }));
}

export function loadGame() {
    const rawData = localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY);
    if (!rawData) return;

    try {
        const data = JSON.parse(rawData);
        if (!data || !data.state) return;

        const loadedState = data.state;

        gameState.money = Number(loadedState.money) || 0;
        gameState.clickPower = Number(loadedState.clickPower) || 1;
        gameState.protectionBonus = Number(loadedState.protectionBonus) || 0;
        gameState.lastLogin = loadedState.lastLogin || null;
        gameState.currentArtifactId = loadedState.currentArtifactId || 'jellyfish';

        if (typeof loadedState.isMusicOn !== 'undefined') gameState.isMusicOn = loadedState.isMusicOn;
        if (typeof loadedState.isSoundOn !== 'undefined') gameState.isSoundOn = loadedState.isSoundOn;

        gameState.emissionTimeLeft = Number(loadedState.emissionTimeLeft) || 90;
        gameState.maxLevel = Number(loadedState.maxLevel) || 10;

        if (Array.isArray(loadedState.artifactData)) {
            gameState.artifactData = mergeArtifactProgress(loadedState.artifactData);
        }

        if (data.prices) {
            Object.assign(prices, data.prices);
        }
    } catch (error) {
        console.warn('Save data could not be loaded. Starting a new game.', error);
        localStorage.removeItem(SAVE_KEY);
    }
}

function mergeArtifactProgress(savedArtifacts) {
    return ARTIFACT_CONFIG.map((artifact) => {
        const saved = savedArtifacts.find((item) => item.id === artifact.id) || {};
        return {
            id: artifact.id,
            level: Number(saved.level) || 1,
            currentClicks: Number(saved.currentClicks) || 0,
            clicksForNextLevel: Number(saved.clicksForNextLevel) || 100,
            isOwned: typeof saved.isOwned === 'boolean' ? saved.isOwned : artifact.id === 'jellyfish',
        };
    });
}
