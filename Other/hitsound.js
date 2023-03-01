function killsay() {
var attacker = entity.get_player_for_user_id(current_event.get_int("attacker"))
var userid = entity.get_player_for_user_id(current_event.get_int("userid"))

  if (attacker == entity.get_local_player() && userid != entity.get_local_player()) {
    utils.play_sound("C:/Weave/sound.wav");
  }
}

register_callback("player_hurt", killsay)
