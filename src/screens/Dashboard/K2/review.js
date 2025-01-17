import {View, Image, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {Card, Text} from "react-native-paper";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {
  useCreateReviewMutation,
  useGetReviewsbyPlaceIdQuery,
} from "../../../redux/reducers/reviews/reviewsThunk";
import moment from "moment";
import StarRating from "../../../components/StarRating";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Review({expeditionId}) {
  const {
    data: Reviewdata,
    isLoading,
    error,
  } = useGetReviewsbyPlaceIdQuery(expeditionId);
  // console.log("data", Reviewdata, error);
  const [comment, setComment] = useState("");

  const [createReview, {isCreateLoading}] = useCreateReviewMutation();

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fun = async () => {
      const id = await AsyncStorage.getItem("userId");
      const name = await AsyncStorage.getItem("userName");
      setUserId(id);
      setUserName(name)
    };
    fun()
  }, []);

  const handlePostComment = () => {
    const reviewData = {
      name: userName,
      title: comment || "title" ,
      comment: "comment",
      place: expeditionId,
      date: new Date(),
      // image:""
    };
    createReview(reviewData).then(res => {
      console.log("object", res);
    });
    // Handle posting the comment
    // console.log(comment);

    setComment("");
  };

  return (
    <ScrollView>
      <View style={{justifyContent: "center", flex: 1, padding: 10}}>
        <Text style={{fontWeight: "bold", fontSize: 12}}>
          Comments and Review
        </Text>

        {Reviewdata?.map((review, index) => (
          <Card
            key={index}
            style={{justifyContent: "center", marginTop: 20, padding: 10}}>
            <View style={{flexDirection: "row", alignItems: "flex-start"}}>
              <Image
                source={
                  review?.image
                    ? {
                        uri: review?.image,
                      }
                    : require("../../../assets/icons/profile.png")
                } // Your image URL here
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
              <View style={{flex: 1}}>
                <Text style={{fontWeight: "bold", fontSize: 14}}>
                  {review?.name}
                </Text>

                <Text style={{fontSize: 12, marginVertical: 5}}>
                  {review?.title}{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                  }}>
                  <StarRating rating={review?.rating} />
                  <Text style={{fontSize: 10, color: "gray"}}>
                    {moment(review?.createdAt).fromNow()}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        ))}

        {/* <Card style={{justifyContent: "center", marginTop: 20, padding: 10}}>
          <View style={{flexDirection: "row", alignItems: "flex-start"}}>
            <Image
              source={{uri:Reviewdata.image}}
              style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}}
            />
            <View style={{flex: 1}}>
              <Text style={{fontWeight: "bold", fontSize: 14}}>
                Reinhold (Legendary Italian Climber):
              </Text>
              <Text style={{fontSize: 12, marginVertical: 5}}>
                This is a sample comment content. The weather is great!
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 12}}>⭐⭐⭐⭐⭐</Text>
                <Text style={{fontSize: 10, color: "gray"}}>5 mins ago</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={{justifyContent: "center", marginTop: 20, padding: 10}}>
          <View style={{flexDirection: "row", alignItems: "flex-start"}}>
            <Image
              source={require("../../../assets/icons/profile2.png")}
              style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}}
            />
            <View style={{flex: 1}}>
              <Text style={{fontWeight: "bold", fontSize: 14}}>
                Nirmal Purja (Nepalese Mountaineer, First Winter Ascent)
              </Text>
              <Text style={{fontSize: 12, marginVertical: 5}}>
                This is a sample comment content. The weather is great!
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 12}}>⭐⭐⭐⭐⭐</Text>
                <Text style={{fontSize: 10, color: "gray"}}>5 mins ago</Text>
              </View>
            </View>
          </View>
        </Card> */}

        <View style={{marginTop: 60}}>
          <Text style={{fontWeight: "bold", fontSize: 12}}>Post a review:</Text>
          <View
            style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
            <TextInput
              style={{
                flex: 1,
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              placeholder="Type your comment..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              onPress={()=>handlePostComment(comment)}
              style={{
                backgroundColor: "#007BFF",
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginLeft: 10, // Add some space between input and button
                // opacity: comment ? 1 : 0.5,
              }}
              // disabled={!comment} // Disable button if comment is empty
            >
              <Text style={{color: "white", textAlign: "center"}}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
