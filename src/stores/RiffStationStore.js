import RiffStationDispatcher from '../dispatchers/RiffStationDispatcher.js';
import EventEmitter from 'events';

let playerState = {}

const RiffStationStore = Object.assign({}, EventEmitter.prototype, {
	getPlayerState: function() {
		return playerState;
	},

	addPlayerListener: function(callback) {
		this.on('player', callback)
	},

	removePlayerListener: function(callback) {
		this.removeListener('player', callback)
	},

	emitPlayerEvent: function() {
		this.emit('player');
	}
})

function _setPlayerState(data) {
	playerState = data;
}

RiffStationDispatcher.register(action => {
	if (action.type === 'UPDATE_PLAYER') {
		_setPlayerState(action.data);
		RiffStationStore.emitPlayerEvent();
	}
})

export default RiffStationStore;