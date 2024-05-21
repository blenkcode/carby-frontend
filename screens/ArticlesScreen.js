import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useEffect, useState } from 'react';

export default function ArticlesScreen() {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/articles/articles')
      .then(response => response.json())
      .then(data => {
        console.log(data.articles);
        setArticlesData(data.articles);
      });
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '... ';
    }
    return text;
  };

  const handleReadMore = (url) => {
    Linking.openURL(url);
  };

  const renderArticles = articlesData.map((article, index) => {
    if (!article.urlToImage) {
      return null; // Skip rendering if there is no image
    }
    return (
      <View key={index} style={styles.articleContainer}>
        <Image source={{ uri: article.urlToImage }} style={styles.articleImage} />
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleContent}>
          {truncateText(article.content, 100)}
          {article.content.length > 100 && (
            <TouchableOpacity onPress={() => handleReadMore(article.url)}>
              <Text style={styles.readMoreText}>lire la suite</Text>
            </TouchableOpacity>
          )}
        </Text>
        <Text style={styles.articleAuthor}>{article.author}</Text>
      </View>
    );
  });

  return (
    <View style={styles.containerG}>
    <ScrollView contentContainerStyle={styles.container}>
      {renderArticles}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    containerG: {
      flex: 1,
      backgroundColor: '#3F5FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  articleContainer: {
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#FFDF3F',
    padding: 15,
    borderRadius: 10,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  articleTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  articleAuthor: {
    textAlign: 'right',
    fontSize: 14,
    marginTop: '3%',
  },
  articleContent: {
    textAlign: 'justify',
    fontSize: 16,
  },
});
