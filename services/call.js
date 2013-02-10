var _ = require('underscore');
var comb = require('comb');
var schedule = require('node-schedule');
var RecurrenceRule = schedule.RecurrenceRule;
var notesImpl = require('./notes');
var logger = require(LIB_DIR + 'log_factory').create("call");

var Twilio = require('twilio-js');
Twilio.AccountSid = TWILIO_ACC_ID;
Twilio.AuthToken  = TWILIO_AUTH_TOKEN;

var Call = comb.define({
	instance : {
		constructor : function(options){
			options = options || {};
			this._super(arguments);
		},
		
		send : function(to, noteSubject, userId, text){
			_.each(to, function(num){
				Twilio.Call.create({to: num, from: TWILIO_NUMBER, url: TWILIO_CALL_CALLBACK + "?user=" + userId + "&subject=" + encodeURIComponent(noteSubject)}, function(err,res) {
					if(err){
						logger.error(err);
					}else
						logger.info('HOLY MOLY! PHONES ARE RINGING');
				});
			});
		}
	}
});

module.exports = new Call();
