import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";

export default function ArticlesScreen() {
  const [articlesData, setArticlesData] = useState([]);
  const [expandedArticles, setExpandedArticles] = useState({});

  useEffect(() => {
    fetch("https://carby-backend.vercel.app/articles/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticlesData(data.articles);
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

  const renderArticles = articlesData.map((article, index) => {
    if (!article.urlToImage) {
      return null; // Si pas d'image ne pas afficher l'article
    }
    const isExpanded = expandedArticles[index];
    const content = isExpanded
      ? article.content
      : truncateText(article.content, 100);

    return (
      <View key={index} style={styles.articleContainer}>
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.articleImage}
        />
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleContent}>
          {content}
          {article.content.length > 100 && (
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
  });

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Articles</Text>
      </View>
      <View style={styles.containerG}>
        <ScrollView contentContainerStyle={styles.container}>
          {renderArticles}
        </ScrollView>
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
    marginBottom: 25,
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
    marginTop: 50,
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
    textAlign: "justify",
    fontSize: 16,
    color: "#fefee3",
  },
  readMoreText: {
    color: "#2c6e49",
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
