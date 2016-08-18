RocketChat.API.v2.addRoute('info', {authRequired: true}, {
	get: () => {
		return {
			success: true
		};
	}
});

RocketChat.API.v2.addRoute('chat.messageExamples', {authRequired: true}, {
	get: () => {
		return {
			success: true
		};
	}
});

RocketChat.API.v2.addRoute('publicRooms', {authRequired: true}, {
	get: () => {
		let rooms = RocketChat.models.Rooms.findByType('c', { sort: { msgs:-1 } }).fetch();
		return {
			status: 'success',
			rooms: rooms
		};
	}
});

RocketChat.API.v2.addRoute('messages', {authRequired: true}, {
	get: () => {
		var e, limit, msgs, rid, skip;

		try {
		  rid = this.urlParams.id;
		  skip = this.queryParams.skip | 0 || 0;
		  limit = this.queryParams.limit | 0 || 50;
		  if (limit > 50) {
		    limit = 50;
		  }
		  if (Meteor.call('canAccessRoom', rid, this.userId)) {
		    msgs = RocketChat.models.Messages.findVisibleByRoomId(rid, {
		      sort: {
		        ts: -1
		      },
		      skip: skip,
		      limit: limit
		    }).fetch();
		    return {
		      status: 'success',
		      messages: msgs
		    };
		  } else {
		    return {
		      statusCode: 403,
		      body: {
		        status: 'fail',
		        message: 'Cannot access room.'
		      }
		    };
		  }
		} catch (_error) {
		  e = _error;
		  return {
		    statusCode: 400,
		    body: {
		      status: 'fail',
		      message: e.name + ' :: ' + e.message
		    }
		  };
		}
	}
});