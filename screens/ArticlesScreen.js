import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";

export default function ArticlesScreen() {
  const [articlesData, setArticlesData] = useState([]);
  const [expandedArticles, setExpandedArticles] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://carby-backend.vercel.app/articles/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticlesData(data.articles);
        setLoading(false);
      });
  }, []);

  const toggleReadMore = (index) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReadMore = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item: article, index }) => {
    if (!article.urlToImage) {
      return null; // Si pas d'image ne pas afficher l'article
    }
    const isExpanded = expandedArticles[index];
    const content = isExpanded
      ? article.description
      : truncateText(article.description, 100);

    return (
      <View key={index} style={styles.articleContainer}>
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.articleImage}
        />
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleContent}>
          {content}
          {article.description.length > 50 && (
            <TouchableOpacity onPress={() => toggleReadMore(index)}>
              <Text style={styles.readMoreText}>
                {isExpanded ? "lire moins" : "lire la suite"}
              </Text>
            </TouchableOpacity>
          )}
        </Text>
        {isExpanded && (
          <TouchableOpacity onPress={() => handleReadMore(article.url)}>
            <Text style={styles.readFullArticleText}>
              Lire l'article complet
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.articleAuthor}>{article.author}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Articles</Text>
      </View>

    <View style={styles.containerG}>
            {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
      <FlatList
        data={articlesData}
        renderItem={renderItem}
        style={styles.containerFlatList}
        onEndReached={() => setPage((prev) => prev + 1)}
          onEndReachedThreshold={1}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      />
      )}
    </View>
    </>
  );
}

const truncateText = (text, maxLength) => {
  if (text.includes("[+")) {
    return text.split("[+")[0];
  }
  if (text.length > maxLength) {
    return text.substring(0, maxLength);
  }
  return text;
};

const styles = StyleSheet.create({
  headerContainer: {
    top: 0,
    backgroundColor: "#2c6e49",
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    zIndex: 500,
    position: "absolute",
    paddingBottom: 25,
    marginBottom: 40,
  },
  headerText: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  containerG: {
    flex: 1,
    backgroundColor: "#4c956c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  containerFlatList: {
    width: "88%",
    marginBottom: "28%",
  },
  containerFlatList: {
    width: "88%",
    marginBottom: "28%",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  articleContainer: {
    marginVertical: 10,
    width: "100%",
    backgroundColor: "#2c6e49",
    padding: 15,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 7 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  articleTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fefee3",
  },
  articleAuthor: {
    textAlign: "right",
    fontSize: 14,
    marginTop: "3%",
    color: "#2c6e49",
  },
  articleContent: {
    textAlign: 'left',
    fontSize: 16,
    color: "#fefee3",
  },
  readMoreText: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "right",
  },
  readFullArticleText: {
    color: "#FF4500",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});
