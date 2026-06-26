import { loadGame, saveGame } from './storage.js';
import { initCustomCursor, hideLoader, updateUI, createFloatingText } from './ui.js';
import { initAudio, setupAudioControls, playSound, startMusic } from './audio.js';
import { startEmissionTimer, startPassiveEffects } from './systems.js';
import { checkDailyBonus, buyUpgrade, buyArtifact, levelUp } from './gameLogic.js';
import { gameState } from './state.js';

let hasInteracted = false;

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    initCustomCursor();
    initAudio();

    setTimeout(hideLoader, 1400);

    startEmissionTimer();
    startPassiveEffects();
    checkDailyBonus();

    updateUI();

    setupAudioControls();
    setupShopEvents();
    setupMainClickEvent();
});

function setupShopEvents() {
    document.querySelectorAll('[data-upgrade]').forEach((button) => {
        button.addEventListener('click', () => buyUpgrade(button.dataset.upgrade));
    });

    document.querySelectorAll('[data-artifact]').forEach((button) => {
        button.addEventListener('click', () => buyArtifact(button.dataset.artifact));
    });
}

function setupMainClickEvent() {
    const artifactButton = document.getElementById('artifact-button');
    const artifactImage = document.getElementById('main-artifact');

    if (!artifactButton || !artifactImage) return;

    artifactButton.addEventListener('click', (event) => {
        if (!hasInteracted) {
            hasInteracted = true;
            startMusic();
        }

        gameState.money += gameState.clickPower;
        playSound('click');

        const currentArtProgress = gameState.artifactData.find((data) => data.id === gameState.currentArtifactId);

        if (currentArtProgress) {
            currentArtProgress.currentClicks += 1;
            if (currentArtProgress.currentClicks >= currentArtProgress.clicksForNextLevel) {
                levelUp(currentArtProgress);
            }
        }

        createFloatingText(event.clientX, event.clientY, `+${gameState.clickPower} KPN`);

        artifactImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            artifactImage.style.transform = '';
        }, 50);

        saveGame();
        updateUI();
    });
}
