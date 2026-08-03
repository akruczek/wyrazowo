//
//  DBModule.m
//  Wyrazowo
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(DBModule, NSObject)
  RCT_EXTERN_METHOD(findPossibleWords:
    (NSString*)allWords
    selectedLetters:(NSString*)selectedLetters
    wordToExtend:(NSString*)wordToExtend
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
  )
@end
