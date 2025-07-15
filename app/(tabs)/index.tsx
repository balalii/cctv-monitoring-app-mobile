import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { ArrowLeft, RefreshCw, Wifi, WifiOff } from 'lucide-react-native';

const CCTV_URL = 'https://cctv-monitoring-six.vercel.app/';

export default function MonitorScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const webViewRef = useRef<WebView>(null);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
    setErrorMessage('');
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (syntheticEvent: any) => {
    setLoading(false);
    setError(true);
    const { nativeEvent } = syntheticEvent;
    setErrorMessage(nativeEvent.description || 'Failed to load page');
    console.log('WebView Error:', nativeEvent);
  };

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
  };

  const handleHttpError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.log('HTTP Error:', nativeEvent);
    if (nativeEvent.statusCode >= 400) {
      setError(true);
      setErrorMessage(`HTTP Error: ${nativeEvent.statusCode}`);
    }
  };
  const goBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const reload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
      setError(false);
      setErrorMessage('');
    }
  };

  const renderError = () => (
    <View style={styles.errorContainer}>
      <WifiOff size={64} color="#9ca3af" />
      <Text style={styles.errorTitle}>Connection Error</Text>
      <Text style={styles.errorMessage}>
        Unable to connect to CCTV monitoring system.
      </Text>
      {errorMessage ? (
        <Text style={styles.errorDetails}>
          Error: {errorMessage}
        </Text>
      ) : null}
      <Text style={styles.errorSubMessage}>
        Please check your internet connection and try again.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={reload}>
        <RefreshCw size={20} color="#ffffff" />
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { opacity: canGoBack ? 1 : 0 }]}
          onPress={goBack}
          disabled={!canGoBack}
        >
          <ArrowLeft size={18} color="white" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          {/* Connection Status */}
          <View style={styles.statusBar}>
            <Wifi
              size={16}
              color={error ? '#ef4444' : loading ? '#e3aa0dff' : '#10b981'}
            />
            <Text
              style={[
                styles.statusText,
                {
                  color: error ? '#ef4444' : loading ? '#e3aa0dff' : '#10b981',
                },
              ]}
            >
              {error
                ? 'Disconnected'
                : loading
                ? 'Connecting...'
                : 'Connected:'}
            </Text>
            {!error && !loading && (
              <Text style={styles.statusLocation}>Indonesia</Text>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.reloadButton} onPress={reload}>
          <RefreshCw size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Connection Status */}
      {/* <View style={styles.statusBar}>
        <Wifi
          size={16}
          color={error ? '#ef4444' : loading ? '#b98c10ff' : '#10b981'}
        />
        <Text
          style={[
            styles.statusText,
            { color: error ? '#ef4444' : loading ? '#b98c10ff' : '#10b981' },
          ]}
        >
          {error ? 'Disconnected' : loading ? 'Connecting...' : 'Connected:'}
        </Text>
        {!error && !loading && (
          <Text style={styles.statusLocation}>Indonesia</Text>
        )}
      </View> */}

      {/* WebView Container */}
      <View style={styles.webViewContainer}>
        {error ? (
          renderError()
        ) : (
          <>
            <WebView
              ref={webViewRef}
              source={{ uri: CCTV_URL }}
              style={styles.webView}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
              onHttpError={handleHttpError}
              onNavigationStateChange={handleNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
              scrollEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              mixedContentMode="compatibility"
              allowsFullscreenVideo={true}
              allowsBackForwardNavigationGestures={true}
              cacheEnabled={true}
              thirdPartyCookiesEnabled={true}
              sharedCookiesEnabled={true}
              userAgent={
                Platform.OS === 'ios'
                  ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
                  : 'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
              }
              originWhitelist={['*']}
              onShouldStartLoadWithRequest={(request) => {
                // Allow all requests
                return true;
              }}
            />

            {loading && (
              <View style={styles.loadingOverlay}>
                <View style={styles.loadingCard}>
                  <ActivityIndicator size="large" color="#000000" />
                  <Text style={styles.loadingText}>Loading CCTV...</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // paddingTop: Platform.OS === 'android' ? 32 : 0,
    paddingTop: 32,
    paddingBottom: 6,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#222222ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  reloadButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    // backgroundColor: '#111111ff',
    borderBottomWidth: 1,
    // borderBottomColor: '#000000ff',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '500',
  },
  statusLocation: {
    marginLeft: 8,
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '400',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 0.6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#ffffff',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  errorDetails: {
    fontSize: 12,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  errorSubMessage: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  retryButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});