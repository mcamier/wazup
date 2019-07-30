import { w3cwebsocket as W3CWebSocket } from "websocket";

export default function openWebSocketAsync(url, onMessageCallback) {
    return new Promise((resolve, reject) => { 
        const connection = new W3CWebSocket(url);
        connection.onopen = () => resolve(connection);
        connection.onerror = err => reject(err);
        connection.onmessage = message => onMessageCallback(message);
    });
};