RocketChat.API.v2.addRoute('info', {authRequired: true}, {
	get: () => {
		return {
			success: true
		};
	}
});

RocketChat.API.v2.addRoute('chat.messageExamples', {authRequired: true}, {
	get: () => {
		return RocketChat.API.v2.success({
			body: [
				{
					token: Random.id(24),
					channel_id: Random.id(),
					channel_name: 'general',
					timestamp: new Date,
					user_id: Random.id(),
					user_name: 'rocket.cat',
					text: 'Sample text 1',
					trigger_word: 'Sample'
				}, 
				{
					token: Random.id(24),
					channel_id: Random.id(),
					channel_name: 'general',
					timestamp: new Date,
					user_id: Random.id(),
					user_name: 'rocket.cat',
					text: 'Sample text 2',
					trigger_word: 'Sample'
				}, 
				{
					token: Random.id(24),
					channel_id: Random.id(),
					channel_name: 'general',
					timestamp: new Date,
					user_id: Random.id(),
					user_name: 'rocket.cat',
					text: 'Sample text 3',
					trigger_word: 'Sample'
				}
			]
		});
	}
});