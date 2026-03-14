import Map "mo:core/Map";
import Text "mo:core/Text";

actor {
  let subscribers = Map.empty<Text, ()>();

  public shared ({ caller }) func subscribe(email : Text) : async () {
    subscribers.add(email, ());
  };

  public query ({ caller }) func getSubscriberCount() : async Nat {
    subscribers.size();
  };
};
