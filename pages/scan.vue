<script setup>
import Header from '~/components/Header.vue';
import Button from '~/components/Button.vue';

// Allowed states for state: "scanning", scan-successful, error (defaults to v-else)
const state = ref()
const scaningState = ref('idle');
const progress = ref(0);
const video = ref(null);
const isBusy = ref(false);
let mediaStream = null;

onMounted(async () => {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video.value) {
            video.value.srcObject = mediaStream;
        }
    } catch (err) {
        console.error('Could not access camera:', err);
        state.value = 'error';
    }
});

const startScan = async () => {
    if (!video.value) return;

    // Prevent multiple clicks
    isBusy.value = true;

    // Capture a frame from the video feed
    const canvas = document.createElement('canvas');
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video.value, 0, 0);
    const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

    // Begin upload
    scaningState.value = 'uploading';
    progress.value = 0;

    try {
        const response = await fetch('/api/uploadToAzure', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Upload failed');
        const { url } = await response.json();

        scaningState.value = 'processing';
        progress.value = 0;

        await simulateProcessing();

        scaningState.value = 'success';
        state.value = 'scan-successful';
    } catch (err) {
        console.error('Error during scan process:', err);
        scaningState.value = 'error';
        state.value = 'error';
    } finally {
        isBusy.value = false;
    }
};

// Example function to simulate server-side processing
// TODO: Replace with actual processing function
const simulateProcessing = () => {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (progress.value < 100) {
                progress.value += 10;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 300);
    });
};

state.value = 'scanning'
</script>
<template>
    <div v-if="state == 'scanning'">
        <Header>Scan</Header>
        <div class="camera-container">
            <video ref="video" autoplay playsinline></video>
        </div>
        <Button @click="startScan" :disabled="isBusy" :type="'primary'">
            Scan
        </Button>

        <div v-if="scaningState !== 'idle'" class="status-container">
            <p v-if="scaningState === 'uploading'">Uploading...</p>
            <p v-if="scaningState === 'processing'">Processing...</p>
            <p v-if="scaningState === 'success'">Done!</p>
            <p v-if="scaningState === 'error'">Error occurred. Please try again.</p>

            <!-- Progress Bar (only in uploading or processing) -->
            <div class="progress-bar-container" v-if="scaningState === 'uploading' || scaningState === 'processing'">
                <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            </div>
        </div>

    </div>
    <div v-else-if="state == 'scan-successful'">
        <p>Scan scan successful page</p>
    </div>
    <div v-else>
        <p>Error page</p>
    </div>
</template>
<style lang="scss">
.camera-container {
    width: 100%;
    height: 70vh;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
}

.camera-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.progress-bar-container {
    width: 80%;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin-top: 8px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: var(--color-secondary);
    /* A distinct purple bar */
    width: 0%;
    transition: width 0.2s ease;
}
</style>