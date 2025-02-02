// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

import BeatmapJson from 'interfaces/beatmap-json';
import BeatmapsetJson from 'interfaces/beatmapset-json';
import RoomJson from 'interfaces/room-json';
import UserMultiplayerHistoryJson, { MultiplayerTypeGroup } from 'interfaces/user-multiplayer-history-json';
import { action, makeObservable, observable } from 'mobx';

export default class MultiplayerHistoryStore {
  @observable beatmaps = new Map<number, BeatmapJson>();
  @observable beatmapsets = new Map<number, BeatmapsetJson>();
  @observable cursor: unknown = null;
  @observable rooms: (RoomJson & Required<Pick<RoomJson, 'playlist'>>)[] = [];
  @observable typeGroup: MultiplayerTypeGroup = 'realtime';

  constructor() {
    makeObservable(this);
  }

  @action
  updateWithJson(json: UserMultiplayerHistoryJson) {
    for (const room of json.rooms) {
      this.rooms.push(room);
    }

    for (const beatmap of json.beatmaps) {
      this.beatmaps.set(beatmap.id, beatmap);
    }

    for (const beatmapset of json.beatmapsets) {
      this.beatmapsets.set(beatmapset.id, beatmapset);
    }

    this.typeGroup = json.type_group;
    this.cursor = json.cursor;
  }
}
