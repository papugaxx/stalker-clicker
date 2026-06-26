import { gameState, prices } from './state.js';
import { ARTIFACT_CONFIG } from './config.js';
import { getCurrentArtifactData } from './gameLogic.js';

export function updateUI() {
    const currentArt = getCurrentArtifactData();

    setText('money-counter', Math.floor(gameState.money));

    const totalProtection = Math.min(100, currentArt.protection + gameState.protectionBonus);
    setText('protection-display', `${totalProtection}%`);
    setText('art-name', currentArt.name);
    setText('art-level', currentArt.level);
    setText('debuff-display', `-${currentArt.debuff.toFixed(2)} KPN/сек`);
    setText('price-click', `${prices.click} KPN`);
    setText('price-protection', `${prices.protection} KPN`);

    const artifactImage = document.getElementById('main-artifact');
    if (artifactImage) {
        artifactImage.src = currentArt.img;
        artifactImage.alt = `Артефакт ${currentArt.name}`;
    }

    const currentArtProgress = gameState.artifactData.find((data) => data.id === gameState.currentArtifactId);
    const fill = document.getElementById('progress-bar-fill');
    if (fill && currentArtProgress) {
        const percent = Math.min(100, (currentArtProgress.currentClicks / currentArtProgress.clicksForNextLevel) * 100);
        fill.style.width = `${percent}%`;
    }

    updateJellyfishItem();
    updateStoneflowerItem();
}

export function showNotification(text, type = 'success') {
    const note = document.createElement('div');
    note.innerText = text;
    note.className = `notification ${type}`;
    note.setAttribute('role', 'status');

    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

export function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
}

export function createFloatingText(x, y, text) {
    const el = document.createElement('div');
    el.innerText = text;
    el.className = 'floating-text';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    document.body.appendChild(el);
    setTimeout(() => {
        el.style.transform = 'translateY(-50px)';
        el.style.opacity = '0';
    }, 10);
    setTimeout(() => el.remove(), 1000);
}

export function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (event) => {
        cursor.style.display = 'block';
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
}

function updateJellyfishItem() {
    const jellyItem = document.getElementById('jellyfish-item');
    if (!jellyItem) return;

    jellyItem.classList.toggle('owned', gameState.currentArtifactId === 'jellyfish');
    const status = jellyItem.querySelector('.status');
    if (status) status.innerText = gameState.currentArtifactId === 'jellyfish' ? 'ИСПОЛЬЗУЕТСЯ' : 'В СУМКЕ';
}

function updateStoneflowerItem() {
    const stoneflowerItem = document.getElementById('stoneflower-item');
    const stoneflowerProgress = gameState.artifactData.find((item) => item.id === 'stoneflower');
    if (!stoneflowerItem || !stoneflowerProgress) return;

    const lock = stoneflowerItem.querySelector('.lock-overlay');
    const priceLabel = document.getElementById('stoneflower-price-label');
    const priceVal = document.getElementById('price-stoneflower');
    const stoneConfig = ARTIFACT_CONFIG.find((artifact) => artifact.id === 'stoneflower');

    if (stoneflowerProgress.isOwned) {
        stoneflowerItem.classList.remove('locked');
        stoneflowerItem.classList.toggle('owned', gameState.currentArtifactId === 'stoneflower');
        if (lock) lock.style.display = 'none';
        if (priceLabel) {
            priceLabel.innerText = gameState.currentArtifactId === 'stoneflower' ? 'ИСПОЛЬЗУЕТСЯ' : 'В СУМКЕ';
            priceLabel.classList.add('status');
            priceLabel.style.color = '#4caf50';
        }
        if (priceVal) priceVal.innerText = '';
    } else {
        stoneflowerItem.classList.add('locked');
        if (lock) lock.style.display = 'flex';
        if (priceLabel) {
            priceLabel.innerText = 'Цена:';
            priceLabel.classList.remove('status');
            priceLabel.style.color = '';
        }
        if (priceVal && stoneConfig) priceVal.innerText = `${stoneConfig.price} KPN`;
    }
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.innerText = value;
}
